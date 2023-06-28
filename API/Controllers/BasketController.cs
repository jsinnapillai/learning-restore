using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;

        }
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetriveBasket();

            if (basket == null) return NotFound();

            return MapBaskettoDto(basket);
        }


        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int ProductId, int quantity)
        {
            var basket = await RetriveBasket();
            if (basket == null)
            {
                basket = CreateBasket();
            }
            var product = await _context.Products.FindAsync(ProductId);
            if (product == null) return NotFound();

            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync();
            if (result > 0)
                return CreatedAtRoute("GetBasket", MapBaskettoDto(basket));
            return BadRequest(new ProblemDetails { Title = "Problm in savingitem to basekt" });
        }


        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basekt = await RetriveBasket();
            basekt.RemoveItem(productId, quantity);
            if (basekt == null) NotFound();
            var result = await _context.SaveChangesAsync();

            if (result > 0)
                return (Ok());

            return BadRequest(new ProblemDetails { Title = "Problm in Removing Item from basekt" });
        }


        private async Task<Basket> RetriveBasket()
        {
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);

            return basket;
        }

        private BasketDto MapBaskettoDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    ProductName = item.Product.Name,
                    Price = item.Product.Price,
                    Brand = item.Product.Brand,
                    ProductType = item.Product.Type,
                    Quantity = item.Quantity,
                    PictureUrl = item.Product.PictureUrl
                }).ToList()
            };
        }


    }
}
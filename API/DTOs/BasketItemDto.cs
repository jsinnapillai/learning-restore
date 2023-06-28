namespace API.DTOs
{
    public class BasketItemDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Brand { get; set; }
        public string ProductType { get; set; }
        public int Quantity { get; set; }


    }
}
namespace PokedexAPI.Controllers
{
  public class Pokemon
  {
    public int Id { get; }
    public string Name { get; set; }

    public Pokemon(int id)
    {
      Id = id;
    }
  }
}
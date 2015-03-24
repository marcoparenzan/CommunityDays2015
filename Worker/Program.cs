using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Worker
{
    class Program
    {
        static void Main(string[] args)
        {
            var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DataEntry"].ConnectionString);
            conn.Open();
            var dataPath = @"D:\Home\Data\DataEntry";
            foreach (var file in Directory.GetFiles(dataPath))
            {
                var items = File.ReadAllText(file).Split(';');

                // https://developers.google.com/maps/documentation/geocoding/
                // http://maps.googleapis.com/maps/api/geocode/json?address={0}&sensor=false
                // Via+Kennedy+38+Fiume+Veneto+Pordenone+Italy
                var url =
                    string.Format(
                        "http://maps.googleapis.com/maps/api/geocode/xml?address={0}&sensor=false"
                        , items[2].Replace(" ", "+")
                    );

                var document = XDocument.Load(url);

                var location = document.Descendants("location").First();
                var lat = location.Element("lat").Value;
                var lng = location.Element("lng").Value;

                var cmd = conn.CreateCommand();
                cmd.CommandText = "INSERT INTO DataEntry (Date, Name, Address, Location) VALUES (@date, @name, @address, @location)";
                cmd.Parameters.AddWithValue("@date", items[0]);
                cmd.Parameters.AddWithValue("@name", items[1]);
                cmd.Parameters.AddWithValue("@address", items[2]);
                cmd.Parameters.AddWithValue("@location", string.Format("POINT({0} {1})", lat, lng));
                cmd.ExecuteNonQuery();

                File.Delete(file);
            }
            conn.Close();
        }
    }
}

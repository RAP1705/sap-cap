using my.bookshop as my from '../db/data-model';
using { Northwind as north } from './external/Northwind';
@path:'/catalog'
service CatalogService {
   
   
extend my.Books with {
  virtual urgency: String;
}
@odata.draft.enabled
entity Books as projection on my.Books actions {
  function stockValue() returns Integer;
  action setPrice(price: Integer) returns Books;
};
entity Authors as projection on my.Authors;
entity Orders as projection on my.Orders;
entity Customers as projection on north.Customers
function totalStock() returns Integer;
}
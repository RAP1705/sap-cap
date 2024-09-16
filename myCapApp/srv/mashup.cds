using   {CatalogService as cs,my.bookshop as bs} from './cat-service';
using {s4} from './external';

extend service cs with{
    entity Customer as projection on s4.Customer_Remote 
    

}
extend bs.Orders with {

    customer : Association to s4.Customer_Remote
}

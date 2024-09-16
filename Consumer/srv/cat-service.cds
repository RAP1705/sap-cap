using consumer as my from '../db/schema';

service CatalogService {
    @readonly entity Books as projection on my.Books;

    entity Orders as select key ID, comment from my.ORDERS
}

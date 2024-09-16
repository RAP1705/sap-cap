using { API_BUSINESS_PARTNER as external } from './API_BUSINESS_PARTNER';
using { Northwind as north } from './Northwind';


namespace s4;

entity Customer_Remote as projection on external.A_BusinessPartner{

    key BusinessPartner as partner,
    BusinessPartnerFullName as name

};

entity c as projection on north.Customers{
*

};



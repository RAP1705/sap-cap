namespace consumer;

entity Books {
  key ID : Integer;
  title  : String;
  stock  : Integer;
}

@cds.persistence.exists
entity ORDERS{
  ID : UUID;
  comment: String;

}
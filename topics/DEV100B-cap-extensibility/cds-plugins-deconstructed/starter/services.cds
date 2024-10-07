service Bookshop {
    entity Books {
        key ID    : Integer;
            title : String;
            genre : String;
            stock : Integer;
    }
    entity Things {
        key ID : Integer;
    }
}

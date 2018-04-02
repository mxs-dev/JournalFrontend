export class Pager {
  protected totalItems: Array<any>;
  protected totalPages: number;
  protected currentPage: number;
  protected pageSize: number;

  public startPage:  number;
  public endPage:    number;
  public startIndex: number;
  public endIndex:   number;
  public pages:      Array<number>;
  public pagedItems: Array<any>;

  public constructor (items: any[], currentPage: number = 1,  pageSize: number = 10) {
     this.currentPage = currentPage;
     this.pageSize    = pageSize;

     this.setItems(items);
  }


  public setItems(items: any[]) {
     this.totalItems = items;
     this.totalPages = Math.ceil(this.totalItems.length / this.pageSize);
     
     this.calculatePages(); 
     this.updatePagedItems();
  }


  public setPage (page: number) {
     if (page < 1 || page > this.totalPages) {
        return;
     }

     this.currentPage = page;
     this.updatePagedItems();     
  }


  protected calculatePages() {
     let startPage: number, endPage: number;
     if (this.totalPages <= 10) {
        startPage = 1;
        endPage = this.totalPages;
     } else {
        if (this.currentPage <= 6) {
           startPage = 1;
           endPage = 10;
        } else if (this.currentPage + 4 >= this.totalPages) {
           startPage = this.totalPages - 9;
           endPage = this.totalPages;
        } else {
           startPage = this.currentPage - 5;
           endPage = this.currentPage + 4;
        }
     }

     this.startPage = startPage;
     this.endPage   = endPage;
     this.pages     = this.range(startPage, endPage);
  }


  protected updatePagedItems () {
     if (this.currentPage > this.totalPages) {
        this.setPage(this.totalPages);
     }

     this.startIndex = (this.currentPage - 1) * this.pageSize;
     this.endIndex = Math.min(this.startIndex + this.pageSize - 1, this.totalItems.length - 1);

     this.pagedItems = this.totalItems.slice(this.startIndex, this.endIndex + 1);
  }


  protected range(a: number, b: number) {
     const res = [];

     for (a; a <= b; a++) {
        res.push(a);
     }

     return res;
  }
}

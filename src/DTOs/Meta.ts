export class Meta {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  remaining_count: number;

  constructor() {
    this.current_page = 0;
    this.per_page = 0;
    this.remaining_count = 0;
    this.total_items = 0;
    this.total_pages = 0;
  }
}

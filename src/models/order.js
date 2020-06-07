class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
  
  get readableDate() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
    
    const d = this.date.getDate();
    const m = monthNames[this.date.getMonth()];
    const y = this.date.getFullYear();
    const h = this.date.getHours();
    const mi = this.date.getMinutes();
    const se = this.date.getSeconds();
    const ampm = h >= 12 ? 'PM' : 'AM'
    return d + ' ' + m + ' ' + y + ', ' + h + ':' + mi +':' + se + ' ' + ampm
    //Can use moment library
  }
}
export default Order;

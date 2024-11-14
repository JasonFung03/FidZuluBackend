class DVD {
    constructor(title, mpaa_rating, studio, time, price) {
        this.title = title;
        this.mpaa_rating = mpaa_rating;
        this.studio = studio;
        this.time = time;
        this.price = price;
    }

    toString() {
        JSON.stringify(this);
    }
}
module.exports = DVD



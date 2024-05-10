const app = Vue.createApp({
    data() {
        return {
            product: "Socks",
            description: "Some description of the socks",
            image: "./assets/images/socks_green.jpg",
            url: "https://vuejs.org/",
            inStock: true,
            inventory: 10,
            onSale: true,
            details: ["50% cotton", "30% wool", "20% polyester"],
            variants: [
                { id: 2234, color: "green", image: "./assets/images/socks_green.jpg" },
                { id: 2235, color: "blue", image: "./assets/images/socks_blue.jpg" }
            ],
            sizes: ["S", "M", "L"],
            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeItem() {
            if (this.cart > 0) {
                this.cart -= 1
            }
        },
        updateImage(variantImage) {
            this.image = variantImage
        },
    }
})
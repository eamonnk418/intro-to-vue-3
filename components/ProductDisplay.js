app.component("product-display", {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
    },
    template:
        /*html*/
        `<div class="product-display">
            <div class="product-container">
            <div class="product-image">
                <!-- :src="image" is shorthand syntax for v-bind:src="image" -->
                <img class="{ 'out-of-stock-img': !inStock }" :src="image">
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="onSale">On Sale</p>
                
                <!-- v-show is more performance than v-if because it doesnt need to update the DOM -->
                <p v-show="inStock">In Stock</p>
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory > 0 && inventory < 11">Almost sold out!</p>
                <p v-else>Out of Stock</p>
                
                <p>Shipping: {{ shipping }}</p>

                <product-details :details="details"></product-details>
                
                <!-- @mouseover="someMethod(args)" is shorthand syntax for v-on:mouseover="someMethod(args)" -->
                <div 
                    v-for="(variant, index) in variants" 
                    :key="variant.id" 
                    @mouseover="updateVariant(index)"
                    class="color-circle" 
                    :style="{ backgroundColor: variant.color }">
                </div>
                <div v-for="size in sizes">{{ size }}</div>
                <p>{{ description }}</p>
                
                <!-- @click="someMethod" is shorthand syntax for v-on:click="someMethod" -->
                <button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" @click="addToCart">Add to Cart</button>
                <button class="button" @click="removeItem">Remove Item</button>
            </div>
        </div>
    </div>`,
    data() {
        return {
            product: "Socks",
            description: "Some description of the socks",
            selectedVariant: 0,
            url: "https://vuejs.org/",
            inventory: 15,
            onSale: true,
            details: ["50% cotton", "30% wool", "20% polyester"],
            variants: [
                { id: 2234, color: "green", image: "./assets/images/socks_green.jpg", quantity: 50 },
                { id: 2235, color: "blue", image: "./assets/images/socks_blue.jpg", quantity: 0 }
            ],
            sizes: ["S", "M", "L"],
            brand: "Vue Mastery",
        }
    },
    methods: {
        addToCart() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].id)
        },
        removeItem() {
            this.$emit("remove-item", this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
    },
    // this gets cached and only recalculated when the dependencies change
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
})
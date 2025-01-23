const { randomUUIDv7 } = require("bun");

export const products = [
    { 
        _id : 1,
        title: "Men Round Toe Sneakers",
        price: 1770,
        images: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRFePaadmiTHYK0GB4yvhzNarWk4Le_LRc4pEBpcNVQF_dOQde7CRHLkhG0r0GloTnmxiwHZbdNAQqcxdKdACWe5bqP9ivZJimy8Y25Lr4TFhBMeBrUCmnbhyw&usqp=CAE",
        rating: 4.5,
        size: [
            "M",
            "L",
            "XL"
        ],
        category: "Men",
        discount: 30,
        description: "Material: Sole - EVA+TPR | Upper - PU+Mesh | Insole material - Molded foam These low-cut casual sneaker shoes are a perfect fit and are made up of a molded foam insole. The EVA+TPR sole material and round-toe shape give the perfect classy vibes. Features: Heel Height - Flat | Toe Shape - Round Benefits: A must-have pair because of the elegance and style it offers, a low-cut pattern with an EVA+TPR sole material for a smooth and classy finish."
    },
    {
        _id : 2,
        title: "Men Textured Formal",
        price: 1558,
        images: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQhYjlLSVxLO4e_vLkqSf7x495PSHGMgXGZhquVc2ixqVZ6HC_Zg0NC0f9eNJlg8h2NymNVdzYC0n_D6XWwbIfHCRqK88_2kZvsCy_5kH62&usqp=CAE",
        rating: 3.8,
        size: [
            "S",
            "M",
            "L"
        ],
        category: "Men",
        discount: "20%",
        shorDetail: "Men's · 7 · Lace-up Boots · Formal",
        description: "A pair of black textured formal derbys with regular styling has a lace-up closure Synthetic patent upper Cushioned footbed Textured and patterned outsole"
    },
    {
        _id : 3,
        title: "Men Synthetic Boots",
        price: 558,
        images: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRx4ysHwq54FEXVQ-EKBRr1wesdlc3APcgmbHKxJi5VJ6knfwhnGlM9mgGsAzSz9TIJVJAilZjbkbf645uowgvIhKaljlA9Ywl9TxulUTqUQJoEJcNIVM73lw",
        rating: 3.2,
        size: [
            "XS",
            "S",
            "M",
            "L",
            "XL"
        ],
        category: "Men",
        discount: "10%",
        shorDetail: "Men's · 7 · Casual",
        description: "Shoes Are The Quintessential Components Of One's Attire. A Trendy Pair Of Shoes Can Set You Apart In A Crowd And Transform You Into A Style Icon. Shoes Not Only Enhance Your Appearance, But Also Help In Boosting Your Confidence."
    },
    {
        _id : 4,
        title: "ELLE Brown Solid Slip-On Party Wear",
        price: 2699,
        images: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcThEliXnuvozEqyBtk97F_lyUkVaqCyafF-mNBA4gmNjSjoKBqJ0CBViNBDtdUhhnho6Is8TLcOXa2iMBRTEjf15LH2mZBsRgCL9bo_xJIyM2OJMSnJv5YDRA",
        rating: 4,
        size: [
            "XS",
            "S",
            "M",
            "XL"
        ],
        category: "Women",
        discount: "40%",
        shorDetail: "Women's · 3 · Snow Boots · Formal",
        description: "Heel Pattern Is Solid. Occasion Is Party. Color Is Brown. Ideal For Is Women. Type For Casual Is Boots. Net Quantity Is 1. Outer Material Is Synthetic."
    },
    {
        _id : 5,
        title: "Heeled Shoes with Embroidered Synthetic Upper",
        price: 760,
        images: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQI9gnocyceZ01-pJ4YrUjd64Gj7FiypC4os0T_jbnJuSAiIz6UXD50B3QK7Y5stVEdyTLxb0y2YtnhbfS7pVpuymzc_m3QgjBxTrl1XKbCes0rq9aLNwVTuQ&usqp=CAE",
        rating: 3.9,
        size: [
            "XS",
            "S",
            "M",
            "L"
        ],
        category: "Women",
        discount: "50%",
        shorDetail: "Women's · 7 · Casual · Heeled",
        description: "Green, Heeled Shoes with Embroidered Synthetic Upper Heels perfect for Casual occasion."
    },
    {
        _id : 6,
        title: "Sneakers Casual Shoes Womens",
        price: 599,
        images: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQauTD8LO9BolVXTLDkEApHkx68ScF1oAkshsrOtoHftQQvwOQ54aG1OeBOV7mZyyqFk_-sVRcmR2w7wX-krDWddiwjeSzamLnQcjO0v3TcAkTW7oWWtR0J&usqp=CAE",
        rating: 3.2,
        size: [
            "XS",
            "S",
            "M",
            "L",
            "XL"
        ],
        category: "Women",
        discount: "60%",
        shorDetail: "Women's · 8 · Blue · Trainer · Casual",
        description: "Surely You Will Like It. Stay Relaxed, Relief, Resilient, With Terfill Versatile Shoes And You Feels Proactive And Fresh For Better Performance. For Runners Who Need A Balance Of Flexibility & Cushioning. Lightweight Upper Hugs The Foot For Breathability, Flexibility. Firm External Heel Counter For Additional Support That Keeps The Back Of The Foot Locked In Place."
    },
    {
        _id : 7,
        title: "Kids Pink Casual Sneaker Shoes",
        price: 762,
        images: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRH8YVX9yhwWLxdSbXapOKmwwdqfKMIZrySpwSn6TRSIDsYCLraqM-NRvDlGIJ897UVimXg68vYOH2MkrYZv0g4GAt8FoBiLQjM4l4EGsDi_BvLy7Nn8xec&usqp=CAE",
        rating: 3.5,
        size: [
            "XS",
            "S",
            "M",
            "L"
        ],
        category: "Girls",
        discount: "20%",
        shorDetail: "Kid's · 7 · Pink · Casual",
        description: "Attractive Gorgeous Kids Girls Pink Casual Sneaker Shoes: Material: Synthetic. Sole Material: Rubber. Pattern: Solid. Fastening & Back Detail: Lace Up. Net Quantity (N): 1. Surely you will like it. Stay relaxed, relief, resilient, with TERFILL versatile Shoes and you feels proactive and fresh for better performance. For runners who need a balance of flexibility & cushioning."
    },
    {
        _id : 8,
        title: "Terfill Girls Lace Sneakers",
        price: 890,
        images: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSjT4zqsmZV4_n5wKdRVjs7s2exBlQvOUv2IQrkRwbMAChZdiOy_hwT74we9cGnfEInkLEuXNlde_s138gq1ebSe8DpAUnyDPVETRLXDp0&usqp=CAE",
        rating: 4.8,
        size: [
            "XS",
            "S",
            "M"
        ],
        category: "Girls",
        discount: "10%",
        shorDetail: "Children's · Girls' · Trainer · Casual",
        description: "Character Is Dora. Sole Material Is Airmix. Size Is 3. Secondary Color Is Pink. Ideal For Is Girls. Brand Color Is Pink. Primary Color Is Pink. Outer Material Is Synthetic Leather. Brand Is Terfill. Style Code Is 914 Multi. Inner Lining Is Fabric. Care Instructions Is Clean Your Shoes Using A Good Quality Brush To Remove Loose Surface Dirt.keep Packing After Use. Insole Material Is Sponge. Closure Type Is Lace. Subtype Is Sneakers. Removable Insole Is No. Type Is Casual Wear."
    },
    {
        _id : 9,
        title: "Boys Outdoor Shoes",
        price: 550,
        images: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRgnKJpQ23Kwi45zmAOOPkA-X6yt0yq2NClt_t83T9R6wymCZURwNHxRFiqLfMDfH3FDQjrYTpH30vzvdKWlNOi3twUZWDhiA&usqp=CAE",
        rating: 4.1,
        size: [
            "XS",
            "S",
            "M",
            "L"
        ],
        category: "Boys",
        discount: "50%",
        shorDetail: "Children's · Boys' · Hook and Loop · Casual",
        description: "Aqua, Boys Outdoor Shoes with Velcro Closure Sports&Outdoor Shoes perfect for Casual occasion."
    },
    {
        _id : 10,
        title: "Kats Boys & Girls Lace Sneakers",
        price: 500,
        images: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT2iIDmUmMNrWcYRBVBvtE_SWjD3-0GKNb94VpLu5YNpLhFExMyuYpHMQ52bDzfgvd2q0-sv5Cq9N7SYkr9afhBIZRZv_6OpTMK07NQrIViYNsVBKtYWaUt&usqp=CAE",
        rating: 4.8,
        size: [
            "XL",
            "S",
            "M",
            "L",
            "XL"
        ],
        category: "Boys",
        discount: "40%",
        shorDetail: "Children's · Mesh · Green · Trainer · Casual",
        description: "Comfort:- Kat's Footwear Is Made With Premium Grade, Non-toxic Materials. Foam Insoles & Cushions Provide A Comfortable Fit, While Padded Heels Absorb Shock. From Day One, Our Mantra-comfort, Quality And Style Has Been The Same. Quality:-unsurpassed Quality And Craftsmanship Have Earned Kat's Footwear A Loyal Following. Premium Grade Mesh, Distinctive Styling And Remarkable Attention To Detail Have Resulted In Truly Exceptional Shoes. Led Light Kids Shoes."
    }
]
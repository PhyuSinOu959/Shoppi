export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: any;
    unit: string;
    stock: number;
    rating: number;
}

export interface SubCategory {
    id: string;
    name: string;
    imageUrl: any;
    products: Product[];
}

export interface ParentCategory {
    id: string;
    name: string;
    imageUrl: any;
    subCategories: SubCategory[];
}

export const PARENT_CATEGORIES: ParentCategory[] = [
    {
        id: '1',
        name: 'Grocery & Staple Food',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
        subCategories: [
            {
                id: '101',
                name: 'Rice & Rice Products',
                imageUrl: require('../../../assets/images/categories/grocery.png'),
                products: [
                    {
                        id: 'p1011',
                        name: 'Basmati Rice Premium',
                        description: 'Premium quality aged basmati rice, perfect for biryani and pulao',
                        price: 25.99,
                        imageUrl: require('../../../assets/images/products/rice.png'),
                        unit: '5kg',
                        stock: 50,
                        rating: 4.5
                    },
                    {
                        id: 'p1012',
                        name: 'Brown Rice Organic',
                        description: 'Organic brown rice, rich in fiber and nutrients',
                        price: 18.99,
                        imageUrl: require('../../../assets/images/products/rice.png'),
                        unit: '2kg',
                        stock: 30,
                        rating: 4.3
                    }
                ]
            },
            {
                id: '102',
                name: 'Pulses & Beans',
                imageUrl: require('../../../assets/images/categories/grocery.png'),
                products: [
                    {
                        id: 'p1021',
                        name: 'Yellow Dal',
                        description: 'Premium quality yellow dal',
                        price: 12.99,
                        imageUrl: require('../../../assets/images/products/dal.png'),
                        unit: '1kg',
                        stock: 40,
                        rating: 4.2
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        name: 'Fruits & Vegetables',
        imageUrl: require('@/assets/images/categories/vegetables.png'),
        subCategories: [
            {
                id: '201',
                name: 'Fresh Vegetables',
                imageUrl: require('@/assets/images/categories/grocery.png'),
                products: [
                    {
                        id: 'p2011',
                        name: 'Fresh Tomatoes',
                        description: 'Farm fresh red tomatoes',
                        price: 2.99,
                        imageUrl: require('@/assets/images/products/vegetables.png'),
                        unit: '500g',
                        stock: 100,
                        rating: 4.0
                    },
                    {
                        id: 'p2012',
                        name: 'Organic Spinach',
                        description: 'Fresh organic spinach leaves',
                        price: 3.49,
                        imageUrl: require('../../../assets/images/products/vegetables.png'),
                        unit: '250g',
                        stock: 80,
                        rating: 4.4
                    }
                ]
            },
            {
                id: '202',
                name: 'Fresh Fruits',
                imageUrl: require('../../../assets/images/categories/grocery.png'),
                products: [
                    {
                        id: 'p2021',
                        name: 'Red Apples',
                        description: 'Sweet and juicy red apples',
                        price: 4.99,
                        imageUrl: require('../../../assets/images/products/vegetables.png'),
                        unit: '1kg',
                        stock: 75,
                        rating: 4.7
                    }
                ]
            }
        ]
    },
    {
        id: '3',
        name: 'Meat & Seafood',
        imageUrl: require('../../../assets/images/categories/meat.png'),
        subCategories: [
            {
                id: '301',
                name: 'Fresh Chicken',
                imageUrl: require('../../../assets/images/categories/grocery.png'),
                products: [
                    {
                        id: 'p3011',
                        name: 'Chicken Breast',
                        description: 'Fresh boneless chicken breast',
                        price: 9.99,
                        imageUrl: require('../../../assets/images/products/meat.png'),
                        unit: '1kg',
                        stock: 25,
                        rating: 4.6
                    }
                ]
            },
            {
                id: '302',
                name: 'Fresh Fish',
                imageUrl: require('../../../assets/images/categories/grocery.png'),
                products: [
                    {
                        id: 'p3021',
                        name: 'Atlantic Salmon',
                        description: 'Fresh Atlantic salmon fillet',
                        price: 24.99,
                        imageUrl: require('../../../assets/images/products/meat.png'),
                        unit: '500g',
                        stock: 15,
                        rating: 4.8
                    }
                ]
            }
        ]
    },
    {
        id: '4',
        name: 'Dairy, Chilled Products & Egg',
        imageUrl: require('../../../assets/images/categories/dairy.png'),
        subCategories: [
            {
                id: '401',
                name: 'Milk & Yogurt',
                imageUrl: require('../../../assets/images/categories/grocery.png'),
                products: [
                    {
                        id: 'p4011',
                        name: 'Fresh Milk',
                        description: 'Full cream fresh milk',
                        price: 3.99,
                        imageUrl: require('../../../assets/images/products/vegetables.png'),
                        unit: '1L',
                        stock: 50,
                        rating: 4.5
                    }
                ]
            }
        ]
    },
    {
        id: '5',
        name: 'Breakfast Essentials & Dessert',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
        subCategories: [
            {
                id: '501',
                name: 'Cereals',
                imageUrl: require('../../../assets/images/categories/grocery.png'),
                products: [
                    {
                        id: 'p5011',
                        name: 'Corn Flakes',
                        description: 'Crunchy corn flakes cereal',
                        price: 5.99,
                        imageUrl: require('../../../assets/images/products/vegetables.png'),
                        unit: '500g',
                        stock: 40,
                        rating: 4.3
                    }
                ]
            }
        ]
    },
    {
        id: '6',
        name: 'Beverage & Snacks',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
        subCategories: []
    },
    {
        id: '7',
        name: 'Beer, Wine & Liquor',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
        subCategories: []
    },
    {
        id: '8',
        name: 'City Exclusive Range',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
        subCategories: []
    },
    {
        id: '9',
        name: 'Baby & Mother Care',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
        subCategories: []
    },
    {
        id: '10',
        name: 'Personal Care',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
        subCategories: []
    },
    {
        id: '11',
        name: 'Household Items',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
        subCategories: []
    },
    {
        id: '12',
        name: 'Kitchen Essentials',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
        subCategories: []
    },
    {
        id: '13',
        name: 'Pet Care',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
        subCategories: []
    },
    {
        id: '14',
        name: 'Health & Wellness',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
        subCategories: []
    },
    {
        id: '15',
        name: 'Stationery & Office Supplies',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
        subCategories: []
    }
];

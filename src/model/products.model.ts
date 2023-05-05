export interface Products {
    id:     string,
    name:   string,
    price:  string,
    image:  string,

};



export interface ProductDto {
    name:        string,
    price:       string,
    category_id: string   
}


export interface ProductDelete {
    id:             string,
    name:           string,
    price:          string,
    image:          string,
    category_id:    string
}



export interface ProductResponse {
    id: number,
    name: string,
    price: string,
    image: string,
    category: {
        id: number,
        name: string,
        icon: string
    }[]
}
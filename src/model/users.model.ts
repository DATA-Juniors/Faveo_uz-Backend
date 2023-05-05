export interface Users {
    id:         number,
    email:      string,
    password:   string,
    name:       string,
    surname:    string,
    birthday:   Date,
    phone:      string,
    token:      string,
    role:       string
}

// export interface updateAppInfo {
//     name:       string,
//     phone:      string,
//     token:      string,
//     geo:        string,
//     address:    string,
// }

export interface UpdateUserDetail { 
    email:      string,
    name:       string,
    surname:    string,
    birthday:   string,
    phone:      string
}


export interface UpdateUserAccess {
    password:   string,
    role:       string
}


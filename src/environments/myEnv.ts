const baseUrl = 'http://localhost:8000/api/v1'
const URLS = {
    base:baseUrl,
    login:baseUrl+'/login',
    logout:baseUrl+'/logout',
    animal:baseUrl+'/animaux',
    autocomplete:baseUrl+'/autocomplete'
}
export const myEnv = {
    urls:URLS,
    tokenKey:'Asity_SI_token'
}

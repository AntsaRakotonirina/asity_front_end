const baseUrl = 'http://localhost:8000/api/v1'
const URLS = {
    base:baseUrl,
    login:baseUrl+'/login',
    logout:baseUrl+'/logout',
    check:baseUrl+'/check',
    animal:baseUrl+'/animaux',
    scientifique:baseUrl+'/scientifiques',
    autocomplete:baseUrl+'/autocomplete',
    user:baseUrl+'/users'
}
export const myEnv = {
    urls:URLS,
    tokenKey:'Asity_SI_token'
}

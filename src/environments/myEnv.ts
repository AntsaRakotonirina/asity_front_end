const baseUrl = 'http://localhost:8000/api/v1'
const URLS = {
    base:baseUrl,
    login:baseUrl+'/login',
    logout:baseUrl+'/logout',
    check:baseUrl+'/check',
    animal:baseUrl+'/animaux',
    scientifique:baseUrl+'/scientifiques',
    autocomplete:baseUrl+'/autocomplete',
    user:baseUrl+'/users',
    name:baseUrl+'/noms',
    note:baseUrl+'/notes',
    parent:baseUrl+'/siteparents',
    region:baseUrl+'/regions',
    site:baseUrl+'/sites',
    suivi:baseUrl+'/suivis',
    participation:baseUrl+'/participations',
    localisation:baseUrl+'/localisations',
    analyse:baseUrl+'/analyse'
}
export const myEnv = {
    urls:URLS,
    tokenKey:'Asity_SI_token'
}

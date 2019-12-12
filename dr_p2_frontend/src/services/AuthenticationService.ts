import { singleRequest, singleRequest1 } from "../utils/single_request"

class AuthenticationService {
    getSessionUser = singleRequest(() => {
        return new Promise<string>((resolve, reject) => {

            setTimeout(() => {
                // simulate already authenticated
                resolve('pippo')

                // simulate unauthenticated
                //reject('not authenticated')
            }, 500)
        })
    })

    login = singleRequest1((username: string): Promise<number> => {
        return new Promise<number>((resolve, reject) => {

            setTimeout(() => {
                resolve(231)
            }, 1000)
        })
    })
}

export default AuthenticationService

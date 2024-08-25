import { MiddlewareHandler, Handler, Hono } from 'hono'
import { createFactory } from 'hono/factory'
import { verifyJwtToken } from './middleware/auth'
import { getUser } from './controllers/user'
import { signUp } from './controllers/signup'
import { login } from './controllers/login'
const mongoose = require('mongoose');


type Methods = ['get', 'post'][number]

interface Routes {
  path: string
  method: Methods
  handlers: (Handler | MiddlewareHandler)[]
}

const factory = createFactory()

//hono by default gives 404 error code upon unknown route access 
//so no point in defining it again

const routes: Routes[] = [
  {
    path: "/",
    method: "get",
    handlers: factory.createHandlers((c) => c.json("welcome", 200))
  },
  {
    path:"/signup",
    method:"post",
    handlers : factory.createHandlers(signUp)
  },
  {
    path:"/login",
    method:"post",
    handlers : factory.createHandlers(login)
  },
  {
    path:"/me",
    method:"get",
    handlers: factory.createHandlers(getUser, verifyJwtToken) //verifyJwtToken is a middleware
  }
 ]

const app = new Hono().basePath("/api")
mongoose.connect(process.env.MONGO_URI);

routes.map((route) => app.on(route.method, route.path, ...route.handlers))

export default app

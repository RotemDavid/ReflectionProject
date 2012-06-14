package controllers

import play.api._
import play.api.mvc._
import templates.Xml

object Application extends Controller {
  
  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def sayHello = Action(parse.xml) { request =>
    (request.body \\ "name" headOption).map(_.text).map { name =>
      Ok("Hello " + name)
    }.getOrElse {
      BadRequest("Missing parameter [name]")
    }
  }


}
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Ekin blogi",
        author:"Erkki Esimerkki",
        url:"www.qqq.aaa",
        likes:13
    },
    {
        title: "Testi Blogi 2",
        author:"Markku Markkula",
        url:"www.blogspot.fi",
        likes:2
    },
    {
        title: "Pullantuoksuinen Haitari",
        author:"Pulla Pullala",
        url:"www.kukatästämaksaa.com",
        likes:6000000
    },
  ]

const nonExistingId = async () => {
  const blog = new Blog({ 
      title: 'willremovethissoon',
        author: 'test',
        url: 'url',
        likes: 0 
    })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
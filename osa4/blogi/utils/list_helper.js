const filterAuth = (blogs, iterator) => blogs.filter(blog => blog.author.toLowerCase() === blogs[iterator].author.toLowerCase())

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const total = blogs.reduce((tot, obj) => obj.likes + tot, 0)
    return total
  }
const favoriteBlog =(blogs) => {
  const favoriteBlog = blogs.reduce((max, test) => max.likes > test.likes ? max : test)
  return favoriteBlog
}
const mostBlogs =(blogs) => {
    let i = 0
    let authors = ([])
    while (i < blogs.length) {
        let totAuthor = filterAuth(blogs, i).length
        authors = authors.concat({
            "author" : blogs[i].author,
            "blogs" : totAuthor
        })
        i += 1
    }
    return authors.reduce((max, test) => max.blogs > test.blogs ? max : test)
 }

 const mostLikes =(blogs) => {
    let i = 0
    let authors = ([])
    while (i < blogs.length) {
        let totAuthor = filterAuth(blogs, i).reduce((tot, obj) => obj.likes + tot, 0)
        authors = authors.concat({
            "author" : blogs[i].author,
            "likes" : totAuthor
        })
        i += 1
    }
    return authors.reduce((max, test) => max.likes > test.likes ? max : test)
 }

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
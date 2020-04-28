const listHelper = require('../utils/list_helper')
const testOne = [
    {
        "title":"Ekin blogi",
        "author":"Erkki Esimerkki",
        "url":"www.qqq.aaa",
        "likes":5,
    },
]
const testMulti = [
    {
        "title":"Ekin blogi",
        "author":"Erkki Esimerkki",
        "url":"www.qqq.aaa",
        "likes":5
    },
    {
        "title":"Blogin Eki",
        "author":"Erkki Esimerkki",
        "url":"www.qqq.aaa",
        "likes":3
    },
    {
        "title":"Kaken Make",
        "author":"Kauko Markku",
        "url":"www.qqq.aaa",
        "likes":1
    },
    {
        "title":"nn",
        "author":"bb",
        "url":"aa",
        "likes":10
    },
    {
        "title":"Ekin blogi 2",
        "author":"Erkki Esimerkki",
        "url":"www",
        "likes":6
    },
    {
        "title":"Blogi 1",
        "author":"Kauko Markku",
        "url":"www.qqq.aaa",
        "likes":2
    },
    {
        "title":"Kakela",
        "author":"Kauko Markku",
        "url":"www.qqq.aaa",
        "likes":3
    },
    {
        "title":"Huono blogi",
        "author":"Kauko Markku",
        "url":"hs.fi",
        "likes":5
    },

]
describe('totalLikes', () => {
    test('of empty list is zero', ()=> {
        expect(listHelper.totalLikes([])).toBe(0)
    }),
    test('of list with one item is the items total likes', ()=> {
        expect(listHelper.totalLikes(testOne)).toBe(5)
    })
    test('of list with multiple items is the sum of likes', ()=> {
        expect(listHelper.totalLikes(testMulti)).toBe(35)
    })
})
describe('mostLikes', () => {
    test('the blog with the most likes is the one with the most likes', () => {
        expect(listHelper.favoriteBlog(testMulti)).toEqual({
            "title":"nn",
            "author":"bb",
            "url":"aa",
            "likes":10
        })
    })
})
describe('favoriteAuthor', () => {
    test('returns the author with the most blogs', () => {
        expect(listHelper.mostBlogs(testMulti)).toEqual({
            "author":"Kauko Markku",
            "blogs":4,
        })
    })
    test('returns the author with the most likes', () => {
        expect(listHelper.mostLikes(testMulti)).toEqual({
            "author":"Erkki Esimerkki",
            "likes":14,
        })
    })
})
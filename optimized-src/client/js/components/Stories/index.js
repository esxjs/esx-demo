'use strict'
const esx = require('esx')()

module.exports = function Stories({ data: stories, location }) {
  if (stories) {
    if (stories.length === 0) {
      return esx `<div>No further items to display.</div>`
    }
    const startingNumber = 0

    return esx `<div start=${startingNumber}>
        ${stories.map((story, index) => {
          const count = index === 0 ? startingNumber : index + startingNumber
          return esx `<article key=${story.id}>
              <div>${count}</div>
              <h2>
                <a href=${story.url}>${story.title}</a>
              </h2>
              <div suppressHydrationWarning>
                ${story.score} points by ${story.by.id}
              </div>
            </article>`
          
        })}
      </div>`
    
  }
}

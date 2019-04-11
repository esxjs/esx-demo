'use strict'
const React = require('react')

module.exports = function Stories({ data: stories, location }) {
  if (stories) {
    if (stories.length === 0) {
      return <div>No further items to display.</div>
    }
    const startingNumber = 0

    return (
      <div start={startingNumber}>
        {stories.filter(Boolean).map((story, index) => {
          const count = index === 0 ? startingNumber : index + startingNumber
          return (
            <article key={story.id}>
              <div>{count}</div>
              <h2>
                <a href={story.url}>{story.title}</a>
              </h2>
              <div suppressHydrationWarning>
                {story.score} points by {story.by.id}
              </div>
            </article>
          )
        })}
      </div>
    )
  }
}

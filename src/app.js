module.exports = function (createApp) {
  return createApp({
    data() {
      return {
        user: 'John Doe',
        count: 0
      }
    },
    template: `
      <div>
        Current user is: {{ user }}
        <button @click="count++">Clicked {{ count }} times</button>
      </div>
    `
  })
}

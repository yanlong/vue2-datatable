export default {
  props: {
    leftFixed: Boolean,
    rightFixed: Boolean
  },
  computed: {
    shouldRenderSelection () {
      return !this.disableSelection && !this.rightFixed && this.selection
    }
  }
}

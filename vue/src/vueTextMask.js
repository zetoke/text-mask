import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

export default {
  render(h) {
    return h('input', {
      ref: 'input',
      domProps: {
        value: this.value
      },
      on: {
        input: (event) => this.updateValue(event.target.value)
      }
    })
  },

  name: 'masked-input',

  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },

    mask: {
      type: [Array, Function, Boolean],
      required: true
    },

    guide: {
      type: Boolean,
      required: false
    },

    placeholderChar: {
      type: String,
      required: false
    },

    keepCharPositions: {
      type: Boolean,
      required: false
    },

    pipe: {
      type: Function,
      required: false
    }
  },

  mounted() {
    this.bind()
  },

  methods: {
    bind() {
      this.textMaskInputElement = createTextMaskInputElement({
        inputElement: this.$refs.input,
        ...this.$options.propsData
      })

      this.updateValue(this.value)
    },

    updateValue(value) {
      this.textMaskInputElement.update(value)
      this.$emit('input', this.$refs.input.value)
    }
  },

  watch: {
    mask(newMask) {
      // Check if the mask has changed (Vue cannot detect whether an array has changed)
      if (this.mask !== newMask) {
        this.bind()
      }
    },

    guide() {
      this.bind()
    },

    placeholderChar() {
      this.bind()
    },

    keepCharPositions() {
      this.bind()
    },

    pipe() {
      this.bind()
    }
  }
}

export {default as conformToMask} from '../../core/src/conformToMask.js'

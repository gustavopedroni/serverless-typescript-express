const settings = {
  get stage(): string {
    return process.env.STAGE
  },
}

export default settings

import DumpUseCase from '@usecases/dump_use_case'

describe('who tests the tests?', () => {
  it('can run a test', () => {
    expect.hasAssertions()

    expect(1).toBe(1)
  })

  it('dump test', async () => {
    expect.hasAssertions()

    const r = await DumpUseCase({ value1: 1, value2: 2 })

    expect(r).toBe(3)
  })
})

interface IDumpUseCase {
  value1: number
  value2: number
}

export default async function DumpUseCase({
  value1,
  value2,
}: IDumpUseCase): Promise<number> {
  return value1 + value2
}

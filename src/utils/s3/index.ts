export const getHttpUrlFromS3 = (s3Url: string | null): string => {
  if (s3Url != null) {
    const parts = s3Url.split('/')
    const [bucketName] = parts[2].split('.')
    const fileKey = parts.slice(3).join('/')
    return `https://${bucketName}.s3.us-west-2.amazonaws.com/${fileKey}`
  }

  return ''
}

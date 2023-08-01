import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  title: string
  coverImage: {
    node: {
      sourceUrl: string
    }
  }
  slug?: string
}

export default function CoverImage({ title, coverImage, slug }: Props) {
  let thumbnail = coverImage?.node.sourceUrl;
  if (thumbnail && !thumbnail.includes('https://')) {
    thumbnail = 'https://bientin.com' + thumbnail;
  }
  const image = (
    <Image
      width={500}
      height={500}
      alt={`Cover Image for ${title}`}
      src={thumbnail}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

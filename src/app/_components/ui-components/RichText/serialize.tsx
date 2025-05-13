import React, { Fragment } from 'react'
import escapeHTML from 'escape-html'
import Image from 'next/image'
import { Text } from 'slate'

import { Label } from '../Label'
import { LargeBody } from '../LargeBody'
import { CMSLink } from '../Link'
import { Media } from '../../../../payload/payload-types'

// eslint-disable-next-line no-use-before-define
type Children = Leaf[]

type Leaf = {
  type: string
  value?: {
    url: string
    alt: string
  }
  children?: Children
  url?: string
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  indent?: number
  [key: string]: unknown
}

const handleNewLines = (text: string) => {
  return text.split('\n').map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ))
}
const serialize = (children?: Children): React.ReactNode[] =>
  children?.map((node, i) => {
    if (Text.isText(node)) {
      let text = node.text ? <span>{handleNewLines(node.text)}</span> : <br />;  // Handles empty text as <br />

      if (node.bold) {
        text = <strong key={i}>{text}</strong>
      }

      if (node.code) {
        text = <code key={i}>{text}</code>
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>
      }

      if (node.underline) {
        text = (
          <span style={{ textDecoration: 'underline' }} key={i}>
            {text}
          </span>
        )
      }

      if (node.strikethrough) {
        text = (
          <span style={{ textDecoration: 'line-through' }} key={i}>
            {text}
          </span>
        )
      }

      return <Fragment key={i}>{text}</Fragment>
    }

    if (!node) {
      return null
    }

    const style: React.CSSProperties = {}

    if (node.textAlign) {
      style.textAlign = node.textAlign
    }

    if (node.indent) {
      style.paddingLeft = `${node.indent * 2}em`
    }

    switch (node.type) {
      case 'h1':
        return (
          <h1 key={i} className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" style={style}>
            {serialize(node?.children)}
          </h1>
        )
      case 'h2':
        return (
          <h2 key={i} className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0" style={style}>
            {serialize(node?.children)}
          </h2>
        )
      case 'h3':
        return (
          <h3 key={i} className="scroll-m-20 text-2xl font-semibold tracking-tight" style={style}>
            {serialize(node?.children)}
          </h3>
        )
      case 'h4':
        return (
          <h4 key={i} className="scroll-m-20 text-l font-semibold tracking-tight" style={style}>
            {serialize(node?.children)}
          </h4>
        )
      case 'h5':
        return <h5 key={i} style={style}>{serialize(node?.children)}</h5>
      case 'h6':
        return <h6 key={i} style={style}>{serialize(node?.children)}</h6>
      case 'quote':
        return <blockquote key={i} style={style}>{serialize(node?.children)}</blockquote>
      case 'ul':
        return <ul key={i} style={style}>{serialize(node?.children)}</ul>
      case 'ol':
        return <ol key={i} style={style}>{serialize(node.children)}</ol>
      case 'li':
        return <li key={i} style={style}>{serialize(node.children)}</li>
      case 'link':
        return (
          <div className="font-bold underline">
            <CMSLink
              key={i}
              type={node.linkType === 'internal' ? 'reference' : 'custom'}
              url={node.url}
              reference={node.doc as any}
              newTab={Boolean(node?.newTab)}
            >
              {serialize(node?.children)}
            </CMSLink>
          </div>
        )
      case 'upload': {
        const mediaUrl = typeof node.value === 'object' && 'filename' in node.value 
          ? `/media/${(node.value as Media).filename}` 
          : '';
        return (
          <div className="flex align-center justify-center pt-4 pb-4">
            <Image
              src={mediaUrl}
              alt={node.value?.alt || 'Uploaded image'}
              width={1980}
              height={1200}
              loading="lazy"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )
      }

      case 'label':
        return (
          <div key={i} style={style}>
            <Label>{serialize(node?.children)}</Label>
          </div>
        )

      case 'large-body': {
        return (
          <div key={i} style={style}>
            <LargeBody>{serialize(node?.children)}</LargeBody>
          </div>
        )
      }

      default:
        return <p key={i} style={style}>{serialize(node?.children)}</p>
    }
  }) || []


export default serialize

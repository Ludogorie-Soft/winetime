import React from 'react'

import { Gutter } from '../../_components/ui-components/Gutter'
import TransitonLayout from '../../_components/TransitionLayout'
import { BookCopy } from 'lucide-react'

import classes from './index.module.scss'
import { Blog as BlogType } from '../../../payload/payload-types'
import { fetchDocs } from '../../_api/fetchDocs'
import { HR } from '../../_components/ui-components/HR'
import BlogCard from '../../_components/Cards/BlogCard'

const Blog = async () => {
  let blogs: BlogType[] | null = null

  try {
    blogs = await fetchDocs<BlogType>('blog')
  } catch (error) {
    console.log(error)
  }
  
  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter>
          <div className="flex justify-start gap-4 items-center pt-4">
            <BookCopy style={{ width: '36px', height: '36px' }} />
            <h3 className="text-3xl leading-10 font-normal">Блог</h3>
          </div>
          <HR />
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs?.map((blog: BlogType) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </Gutter>
      </div>
    </TransitonLayout>
  )
}

export default Blog

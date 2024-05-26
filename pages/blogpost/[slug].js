import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '@/styles/blogpost.module.css'
import * as fs from 'fs';



const Slug = (props) => {
  function createMarkup(c) {
    return {__html: c};
  }
  const [blog, setBlog] = useState(props.myBlog);
  
  // console.log(router.query)
  // const {slug} = router.query;

  return <div className={styles.container}>
    <main className={styles.main}>
      <h1>{blog && blog.title} </h1>
      <br />
      { blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}

    </main>
  </div>

};
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'how-to-learn-cplusplus'} },
      { params: { slug: 'how-to-learn-flask'} },
      { params: { slug: 'how-to-learn-javascript'} },
      { params: { slug: 'how-to-learn-mongo'} },
    ],
    fallback: true // false or 'blocking'
  };
}

export async function getStaticProps(context) {  
  const { slug } = context.params;

// export async function getServerSideProps(context){

//   const {slug} =context.query;
//   let data =await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
//   let myBlog =await data.json()
let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`,'utf-8')  
return{
  props: { myBlog: JSON.parse(myBlog) },
  }
}

export default Slug;

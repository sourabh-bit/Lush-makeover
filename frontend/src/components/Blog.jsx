import React from 'react';
import { blogPosts } from '../mock';

const Blog = () => {
  return (
    <section id="blog" className="w-full bg-white pb-24">
      <div className="max-w-[1180px] mx-auto px-4 md:px-8 text-center">
        <div className="font-script italic text-[#3a3a3a] text-[18px] md:text-[20px]">from</div>
        <div className="font-display text-[#3a3a3a] text-[22px] md:text-[26px] tracking-[0.4em] mt-1">
          THE BLOG
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {blogPosts.map((post, i) => (
            <a
              key={i}
              href="#blog-post"
              className="group block text-left"
            >
              <div className="img-zoom h-[300px] md:h-[360px]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 font-script italic text-[#3a3a3a] text-[17px] md:text-[19px] leading-snug px-1 group-hover:text-[#a08f7d] transition-colors">
                {post.title}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

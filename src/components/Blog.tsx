import { useState } from 'react';
import { Calendar, Clock, Tag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Mock data - would be fetched from CMS in real implementation
  const posts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of AI in Web Development",
      excerpt: "Exploring how artificial intelligence is revolutionizing the way we build web applications and what it means for developers.",
      content: "Artificial Intelligence is no longer a distant future concept—it's here, and it's transforming web development in unprecedented ways. From automated code generation to intelligent user interfaces, AI is reshaping how we approach building digital experiences...",
      coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["AI", "Web Development", "Future Tech"],
      featured: true
    },
    {
      id: 2,
      title: "Building Scalable Microservices with Node.js",
      excerpt: "A comprehensive guide to architecting and implementing microservices that can handle millions of requests.",
      content: "Microservices architecture has become the backbone of modern web applications. In this deep dive, we'll explore how to build robust, scalable microservices using Node.js, covering everything from service discovery to load balancing...",
      coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      date: "2024-01-10",
      readTime: "12 min read",
      tags: ["Node.js", "Microservices", "Architecture"],
      featured: false
    },
    {
      id: 3,
      title: "Machine Learning Models in Production",
      excerpt: "Best practices for deploying and maintaining ML models in production environments with real-world examples.",
      content: "Deploying machine learning models to production is often more challenging than building them. This article covers the essential practices, tools, and strategies for successfully operationalizing ML models at scale...",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      date: "2024-01-05",
      readTime: "15 min read",
      tags: ["Machine Learning", "DevOps", "Production"],
      featured: true
    },
    {
      id: 3,
      title: "Machine Learning Models in Production",
      excerpt: "Best practices for deploying and maintaining ML models in production environments with real-world examples.",
      content: "Deploying machine learning models to production is often more challenging than building them. This article covers the essential practices, tools, and strategies for successfully operationalizing ML models at scale...",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      date: "2024-01-05",
      readTime: "15 min read",
      tags: ["Machine Learning", "DevOps", "Production"],
      featured: true
    }
  ];

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  const BlogModal = ({ post, onClose }: { post: BlogPost; onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto glow-primary">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 glass-card p-2 rounded-full hover:glow-accent transition-all duration-300"
          >
            <X className="h-6 w-6" />
          </button>
          
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          
          <div className="p-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
            
            <h3 className="text-3xl font-orbitron font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              {post.title}
            </h3>
            
            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-muted-foreground leading-relaxed">
                {post.content}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="glass-card px-3 py-1 text-sm hover:glow-accent transition-all duration-300 flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="blog" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="fade-in text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Latest Articles
        </h2>
        <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
          Insights, tutorials, and thoughts on the latest in technology and development
        </p>
      </div>

      {/* Tag Filter */}
      <div className="fade-in delay-200 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedTag(null)}
            className={`glass-card px-4 py-2 text-sm transition-all duration-300 ${
              !selectedTag ? 'glow-primary' : 'hover:glow-secondary'
            }`}
          >
            All Posts
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`glass-card px-4 py-2 text-sm transition-all duration-300 ${
                selectedTag === tag ? 'glow-primary' : 'hover:glow-secondary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <div 
            key={post.id} 
            className={`fade-in delay-${300 + index * 100} cursor-pointer group`}
            onClick={() => setSelectedPost(post)}
          >
            <div className="glass-card overflow-hidden hover:glow-secondary transition-all duration-500 hover:scale-[1.02] h-full flex flex-col">
              <div className="relative overflow-hidden">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {post.featured && (
                  <div className="absolute top-4 left-4 glass-card px-3 py-1 text-xs font-medium glow-accent">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-lg font-orbitron font-semibold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="glass-card px-2 py-1 text-xs flex items-center gap-1"
                    >
                      <Tag className="h-2 w-2" />
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{post.tags.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center text-muted-foreground">
          No posts found for the selected tag.
        </div>
      )}

      {selectedPost && (
        <BlogModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
    </section>
  );
};

export default Blog;
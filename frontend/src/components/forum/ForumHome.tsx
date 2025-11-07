import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, MessageSquare, Heart, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface Post {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  excerpt: string;
  tags: string[];
  comments: number;
  likes: number;
  timestamp: string;
}

export function ForumHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [useAI, setUseAI] = useState(false);

  const [posts] = useState<Post[]>([
    {
      id: '1',
      title: 'Best practices for technical interviews in 2024',
      author: { name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
      excerpt: 'After conducting 50+ interviews this year, here are my top tips for both interviewers and candidates...',
      tags: ['Interviews', 'Career', 'Tips'],
      comments: 24,
      likes: 156,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      title: 'How to structure a developer resume?',
      author: { name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
      excerpt: 'I\'ve been reviewing resumes for years. Here\'s what makes a developer resume stand out...',
      tags: ['Resume', 'Career', 'Development'],
      comments: 18,
      likes: 89,
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      title: 'Transitioning from frontend to full-stack',
      author: { name: 'Emily Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily' },
      excerpt: 'My journey from React developer to full-stack engineer, and the resources that helped me...',
      tags: ['Career Growth', 'Full Stack', 'Learning'],
      comments: 32,
      likes: 203,
      timestamp: '1 day ago'
    },
    {
      id: '4',
      title: 'Remote work interview tips',
      author: { name: 'David Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
      excerpt: 'Virtual interviews are different. Here\'s how to ace them...',
      tags: ['Remote', 'Interviews', 'Tips'],
      comments: 15,
      likes: 67,
      timestamp: '2 days ago'
    },
    {
      id: '5',
      title: 'Should I include side projects in my resume?',
      author: { name: 'Jessica Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jessica' },
      excerpt: 'Discussing the pros and cons of showcasing personal projects...',
      tags: ['Resume', 'Projects', 'Advice'],
      comments: 41,
      likes: 178,
      timestamp: '3 days ago'
    }
  ]);

  const handleCreatePost = () => {
    toast.success('Post created successfully!');
    setIsCreateModalOpen(false);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags('');
    setUseAI(false);
  };

  const handleGenerateSummary = () => {
    toast.success('AI summary generated!');
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-[#1E293B] mb-2">Community Forum</h1>
          <p className="text-gray-600">Share knowledge and connect with professionals</p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2">
              <Plus className="w-5 h-5" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
              <DialogDescription>Share your thoughts with the community</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="post-title">Title</Label>
                <Input
                  id="post-title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="What's your post about?"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="post-content">Content</Label>
                <Textarea
                  id="post-content"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="min-h-[200px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-tags">Tags (comma separated)</Label>
                <Input
                  id="post-tags"
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                  placeholder="e.g., Career, Tips, Resume"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGenerateSummary}
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Summary with AI
                </Button>
              </div>

              <Button
                onClick={handleCreatePost}
                className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                disabled={!newPostTitle || !newPostContent}
              >
                Publish Post
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts, tags, or topics..."
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <p className="text-2xl text-[#6366F1] mb-1">{posts.length}</p>
            <p className="text-sm text-gray-600">Total Posts</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <p className="text-2xl text-[#8B5CF6] mb-1">1.2k</p>
            <p className="text-sm text-gray-600">Members</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <p className="text-2xl text-[#6366F1] mb-1">
              {posts.reduce((sum, post) => sum + post.comments, 0)}
            </p>
            <p className="text-sm text-gray-600">Comments</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <p className="text-2xl text-[#8B5CF6] mb-1">24</p>
            <p className="text-sm text-gray-600">Active Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/forum/post/${post.id}`)}
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-[#1E293B]">{post.author.name}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{post.timestamp}</span>
                  </div>
                  <CardTitle className="text-lg text-[#1E293B] mb-2">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {post.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="py-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-[#1E293B] mb-2">No posts found</h3>
            <p className="text-gray-600">Try adjusting your search query</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageSquare, Send, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export function PostDetail() {
  // const { id } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const post = {
    id: '1',
    title: 'Best practices for technical interviews in 2024',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      title: 'Senior Technical Recruiter'
    },
    content: `After conducting 50+ technical interviews this year, I've noticed some patterns that distinguish great candidates from good ones. Here are my top insights:

1. **Communication is Key**: The best candidates explain their thought process clearly. They don't just solve the problem; they take you on a journey through their reasoning.

2. **Ask Questions**: Don't be afraid to clarify requirements. It shows you're thinking about edge cases and real-world applications.

3. **Practice, But Don't Memorize**: Know your fundamentals well, but be ready to adapt to unique problems. Interviewers can spot memorized answers.

4. **Be Honest About What You Don't Know**: It's better to say "I'm not familiar with that, but here's how I would learn it" than to pretend you know everything.

5. **Follow Up**: Send a thoughtful thank-you email. It's a simple gesture that goes a long way.

What are your experiences with technical interviews? What would you add to this list?`,
    tags: ['Interviews', 'Career', 'Tips'],
    timestamp: '2 hours ago',
    likes: 156,
    commentsCount: 24
  };

  const [comments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        name: 'Michael Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael'
      },
      content: 'Great points! I would add that showing enthusiasm for the company and role makes a huge difference.',
      timestamp: '1 hour ago',
      likes: 12,
      replies: [
        {
          id: '1-1',
          author: {
            name: 'Sarah Johnson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
          },
          content: 'Absolutely! Genuine interest is something we always look for.',
          timestamp: '45 minutes ago',
          likes: 5
        }
      ]
    },
    {
      id: '2',
      author: {
        name: 'Emily Rodriguez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily'
      },
      content: 'The point about asking questions is so important. I used to be afraid to ask, but it actually helped me in my last interview.',
      timestamp: '30 minutes ago',
      likes: 8
    }
  ]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      toast.success('Comment added!');
      setNewComment('');
    }
  };

  // const handleAddReply = (commentId: string) => {
  //   if (replyContent.trim()) {
  //     toast.success('Reply added!');
  //     setReplyContent('');
  //     setReplyTo(null);
  //   }
  // };

  const handleLike = () => {
    toast.success('Post liked!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/forum')}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Forum
      </Button>

      {/* Post Content */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-[#1E293B]">{post.author.name}</h3>
              <p className="text-sm text-gray-600">{post.author.title}</p>
              <p className="text-sm text-gray-500">{post.timestamp}</p>
            </div>
          </div>

          <CardTitle className="text-2xl text-[#1E293B] mb-3">{post.title}</CardTitle>

          <div className="flex gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose prose-gray max-w-none mb-6">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</p>
          </div>

          <Separator className="my-6" />

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleLike}
              className="gap-2"
            >
              <Heart className="w-5 h-5" />
              {post.likes}
            </Button>
            <Button variant="ghost" className="gap-2">
              <MessageSquare className="w-5 h-5" />
              {post.commentsCount}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Comment */}
          <div className="space-y-3">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="min-h-[100px]"
            />
            <Button
              onClick={handleAddComment}
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2"
              disabled={!newComment.trim()}
            >
              <Send className="w-4 h-4" />
              Post Comment
            </Button>
          </div>

          <Separator />

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-[#1E293B]">{comment.author.name}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs">
                        <ThumbsUp className="w-3 h-3" />
                        {comment.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => setReplyTo(comment.id)}
                      >
                        Reply
                      </Button>
                    </div>

                    {/* Reply Input */}
                    {replyTo === comment.id && (
                      <div className="mt-3 space-y-2">
                        <Textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write a reply..."
                          className="min-h-[80px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            // onClick={() => handleAddReply(comment.id)}
                            className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                          >
                            Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setReplyTo(null);
                              setReplyContent('');
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Nested Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-6 mt-4 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={reply.author.avatar} />
                              <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-[#1E293B]">{reply.author.name}</span>
                                  <span className="text-xs text-gray-500">•</span>
                                  <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                </div>
                                <p className="text-sm text-gray-700">{reply.content}</p>
                              </div>
                              <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs mt-1">
                                <ThumbsUp className="w-3 h-3" />
                                {reply.likes}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Posts Sidebar (optional) */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Recommended Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { title: 'How to structure a developer resume?', comments: 18 },
            { title: 'Remote work interview tips', comments: 15 },
            { title: 'Transitioning to full-stack', comments: 32 }
          ].map((rec, index) => (
            <button
              key={index}
              onClick={() => navigate(`/forum/post/${index + 2}`)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p className="text-sm text-[#1E293B] mb-1">{rec.title}</p>
              <p className="text-xs text-gray-500">{rec.comments} comments</p>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { UserPlus, Users, UserCheck, UserX, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  title: string;
  avatar: string;
  mutualConnections?: number;
  status?: 'pending' | 'connected';
}

export function ConnectionsPage() {
  const [pendingRequests, setPendingRequests] = useState<User[]>([
    {
      id: '1',
      name: 'Alex Thompson',
      title: 'Software Engineer at Google',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      mutualConnections: 12,
      status: 'pending'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      title: 'UX Designer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      mutualConnections: 5,
      status: 'pending'
    }
  ]);

  const [connections, setConnections] = useState<User[]>([
    {
      id: '3',
      name: 'Sarah Johnson',
      title: 'Senior Technical Recruiter',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      mutualConnections: 24,
      status: 'connected'
    },
    {
      id: '4',
      name: 'Michael Chen',
      title: 'Full Stack Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      mutualConnections: 18,
      status: 'connected'
    },
    {
      id: '5',
      name: 'Emily Rodriguez',
      title: 'Product Manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      mutualConnections: 31,
      status: 'connected'
    },
    {
      id: '6',
      name: 'David Kim',
      title: 'DevOps Engineer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      mutualConnections: 9,
      status: 'connected'
    }
  ]);

  const [suggestions] = useState<User[]>([
    {
      id: '7',
      name: 'Lisa Wang',
      title: 'Frontend Developer at Meta',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
      mutualConnections: 15
    },
    {
      id: '8',
      name: 'James Wilson',
      title: 'Tech Lead at Amazon',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
      mutualConnections: 22
    },
    {
      id: '9',
      name: 'Nina Patel',
      title: 'Data Scientist',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nina',
      mutualConnections: 8
    }
  ]);

  const [aiSuggestions] = useState<User[]>([
    {
      id: '10',
      name: 'Robert Chang',
      title: 'Senior React Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert',
      mutualConnections: 19
    },
    {
      id: '11',
      name: 'Sophie Martinez',
      title: 'Backend Engineer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sophie',
      mutualConnections: 11
    },
    {
      id: '12',
      name: 'Kevin Brown',
      title: 'Cloud Architect',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kevin',
      mutualConnections: 27
    }
  ]);

  const handleAccept = (id: string) => {
    const user = pendingRequests.find(u => u.id === id);
    if (user) {
      setPendingRequests(pendingRequests.filter(u => u.id !== id));
      setConnections([...connections, { ...user, status: 'connected' }]);
      toast.success(`Connected with ${user.name}`);
    }
  };

  const handleReject = (id: string) => {
    setPendingRequests(pendingRequests.filter(u => u.id !== id));
    toast.success('Request rejected');
  };

  const handleConnect = (user: User) => {
    toast.success(`Connection request sent to ${user.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-[#1E293B] mb-2">My Connections</h1>
        <p className="text-gray-600">Manage your professional network</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Connections</p>
                <p className="text-2xl text-[#6366F1]">{connections.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#6366F1]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
                <p className="text-2xl text-[#8B5CF6]">{pendingRequests.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-[#8B5CF6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Profile Views</p>
                <p className="text-2xl text-[#6366F1]">847</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#6366F1]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-grid">
          <TabsTrigger value="requests">
            Requests ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="connections">
            Connections ({connections.length})
          </TabsTrigger>
          <TabsTrigger value="suggestions">
            Suggestions
          </TabsTrigger>
        </TabsList>

        {/* Pending Requests */}
        <TabsContent value="requests" className="space-y-4">
          {pendingRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.map((user) => (
                <Card key={user.id} className="rounded-xl shadow-sm border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-[#1E293B] mb-1">{user.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{user.title}</p>
                        <p className="text-xs text-gray-500 mb-3">
                          {user.mutualConnections} mutual connections
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAccept(user.id)}
                            className="flex-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-1"
                          >
                            <UserCheck className="w-4 h-4" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(user.id)}
                            className="flex-1 gap-1"
                          >
                            <UserX className="w-4 h-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="rounded-xl shadow-sm border-gray-200">
              <CardContent className="py-12 text-center">
                <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg text-[#1E293B] mb-2">No pending requests</h3>
                <p className="text-gray-600">Check back later for new connection requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Connections */}
        <TabsContent value="connections" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections.map((user) => (
              <Card key={user.id} className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-[#1E293B] mb-1">{user.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{user.title}</p>
                    <p className="text-xs text-gray-500 mb-3">
                      {user.mutualConnections} mutual connections
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Suggestions */}
        <TabsContent value="suggestions" className="space-y-6">
          {/* AI Suggestions */}
          <Card className="rounded-xl shadow-sm border-[#6366F1]/20 bg-gradient-to-r from-[#6366F1]/5 to-[#8B5CF6]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-[#6366F1]" />
                AI Friend Suggestions
              </CardTitle>
              <CardDescription>
                People you may know based on your profile and interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiSuggestions.map((user) => (
                  <Card key={user.id} className="rounded-xl shadow-sm border-gray-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Avatar className="w-16 h-16 mx-auto mb-3">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-[#1E293B] mb-1">{user.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{user.title}</p>
                        <p className="text-xs text-gray-500 mb-3">
                          {user.mutualConnections} mutual connections
                        </p>
                        <Button
                          size="sm"
                          onClick={() => handleConnect(user)}
                          className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-1"
                        >
                          <UserPlus className="w-4 h-4" />
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regular Suggestions */}
          <Card className="rounded-xl shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">People You May Know</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestions.map((user) => (
                  <Card key={user.id} className="rounded-xl shadow-sm border-gray-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Avatar className="w-16 h-16 mx-auto mb-3">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-[#1E293B] mb-1">{user.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{user.title}</p>
                        <p className="text-xs text-gray-500 mb-3">
                          {user.mutualConnections} mutual connections
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleConnect(user)}
                          className="w-full gap-1"
                        >
                          <UserPlus className="w-4 h-4" />
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

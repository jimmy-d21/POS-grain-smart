import { useState } from 'react';
import { useStore } from '../lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Users, UserPlus, Edit, Search, Shield, User, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { demoPasswords } from '../lib/data';

export function StaffManagementPage() {
  const { staff, addStaff, updateStaff } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [editDialog, setEditDialog] = useState({
    open: false,
    staff: null,
    mode: 'add',
  });
  const [viewDialog, setViewDialog] = useState({
    open: false,
    staff: null,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Cashier',
    status: 'Active',
  });

  const filteredStaff = staff.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || s.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const activeCount = staff.filter(s => s.status === 'Active').length;
  const managerCount = staff.filter(s => s.role === 'Manager').length;
  const cashierCount = staff.filter(s => s.role === 'Cashier').length;

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      role: 'Cashier',
      status: 'Active',
    });
    setEditDialog({ open: true, staff: null, mode: 'add' });
  };

  const handleOpenEdit = (staffMember) => {
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      role: staffMember.role,
      status: staffMember.status,
    });
    setEditDialog({ open: true, staff: staffMember, mode: 'edit' });
  };

  const handleOpenView = (staffMember) => {
    setViewDialog({ open: true, staff: staffMember });
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (editDialog.mode === 'add') {
      const newStaff = {
        id: `st${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
      };
      addStaff(newStaff);
      toast.success('Staff member added successfully!');
    } else if (editDialog.staff) {
      updateStaff(editDialog.staff.id, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
      });
      toast.success('Staff member updated successfully!');
    }

    setEditDialog({ open: false, staff: null, mode: 'add' });
  };

  const handleToggleStatus = (staffMember) => {
    const newStatus = staffMember.status === 'Active' ? 'Inactive' : 'Active';
    updateStaff(staffMember.id, { status: newStatus });
    toast.success(`Staff member ${newStatus === 'Active' ? 'activated' : 'deactivated'}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Staff Management</h1>
          <p className="text-muted-foreground">Manage staff accounts and permissions</p>
        </div>
        <Button onClick={handleOpenAdd}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Staff</CardTitle>
            <Users className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            <Users className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Managers</CardTitle>
            <Shield className="w-5 h-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{managerCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cashiers</CardTitle>
            <User className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cashierCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search staff by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['All', 'Manager', 'Cashier'].map(role => (
                <Button
                  key={role}
                  variant={selectedRole === role ? 'default' : 'outline'}
                  onClick={() => setSelectedRole(role)}
                  size="sm"
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No staff members found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStaff.map(staffMember => (
                    <TableRow key={staffMember.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary-foreground">
                              {staffMember.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium">{staffMember.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{staffMember.email}</TableCell>
                      <TableCell>
                        <Badge variant={staffMember.role === 'Manager' ? 'default' : 'secondary'}>
                          {staffMember.role === 'Manager' ? <Shield className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                          {staffMember.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={staffMember.status === 'Active' ? 'default' : 'outline'}>
                          {staffMember.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenView(staffMember)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(staffMember)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStatus(staffMember)}
                            className={staffMember.status === 'Active' ? 'text-destructive' : 'text-accent'}
                          >
                            {staffMember.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={viewDialog.open} onOpenChange={(open) => setViewDialog({ open, staff: open ? viewDialog.staff : null })}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Staff Member Details</DialogTitle>
          </DialogHeader>

          {viewDialog.staff && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl font-semibold text-primary-foreground">
                    {viewDialog.staff.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Full Name</div>
                  <div className="font-semibold">{viewDialog.staff.name}</div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Email Address</div>
                  <div className="font-semibold">{viewDialog.staff.email}</div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Password</div>
                  <div className="font-semibold font-mono">{demoPasswords[viewDialog.staff.email] || 'Not available'}</div>
                  <div className="text-xs text-muted-foreground mt-1">Demo password for testing purposes</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Role</div>
                    <Badge variant={viewDialog.staff.role === 'Manager' ? 'default' : 'secondary'} className="mt-1">
                      {viewDialog.staff.role === 'Manager' ? <Shield className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                      {viewDialog.staff.role}
                    </Badge>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Status</div>
                    <Badge variant={viewDialog.staff.status === 'Active' ? 'default' : 'outline'} className="mt-1">
                      {viewDialog.staff.status}
                    </Badge>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Staff ID</div>
                  <div className="font-semibold font-mono text-sm">{viewDialog.staff.id}</div>
                </div>
              </div>

              {viewDialog.staff.role === 'Manager' && (
                <div className="p-3 bg-primary/10 border border-primary rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-primary mt-0.5" />
                    <div className="text-xs text-primary">
                      This staff member has full access to all features including inventory, menu management, staff management, and analytics.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setViewDialog({ open: false, staff: null })}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Dialog */}
      <Dialog open={editDialog.open} onOpenChange={(open) => setEditDialog({ open, staff: open ? editDialog.staff : null, mode: editDialog.mode })}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editDialog.mode === 'add' ? 'Add Staff Member' : 'Edit Staff Member'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Juan Dela Cruz"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="e.g., juan@grainsmart.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="role">Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cashier">Cashier</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {formData.role === 'Manager' 
                  ? 'Full access to all features and settings'
                  : 'Access to POS and basic features only'
                }
              </p>
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialog({ open: false, staff: null, mode: 'add' })}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editDialog.mode === 'add' ? 'Add Staff Member' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

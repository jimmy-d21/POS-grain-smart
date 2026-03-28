import { useState } from "react";
import { useStaff } from "../context/StaffContext.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Badge } from "../components/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import { staffRoles, staffStatus } from "../data/StaffManagementData";
import { Users, UserPlus, Edit, Search, Shield, User, Eye } from "lucide-react";
import { toast } from "sonner";
import { demoPasswords } from "../data/mockData";

export function StaffManagementPage() {
  const { staff, addStaff, updateStaff } = useStaff();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [editDialog, setEditDialog] = useState({
    open: false,
    item: null,
  });
  const [viewDialog, setViewDialog] = useState({
    open: false,
    item: null,
  });

  const [formData, setFormData] = useState({
    name: "",
    role: "Cashier",
    email: "",
    status: "Active",
  });

  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "All" || s.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const activeCount = staff.filter((s) => s.status === "Active").length;
  const managerCount = staff.filter((s) => s.role === "Manager").length;
  const cashierCount = staff.filter((s) => s.role === "Cashier").length;

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      role: "Cashier",
      email: "",
      status: "Active",
    });
    setEditDialog({ open: true, item: null });
  };

  const handleOpenEdit = (staffMember) => {
    setFormData({
      name: staffMember.name,
      role: staffMember.role,
      email: staffMember.email,
      status: staffMember.status,
    });
    setEditDialog({ open: true, item: staffMember });
  };

  const handleOpenView = (staffMember) => {
    setViewDialog({ open: true, item: staffMember });
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (editDialog.item === null) {
      const newStaff = {
        id: `staff_${Date.now()}`,
        ...formData,
      };
      addStaff(newStaff);
      toast.success("Staff member added successfully!");
    } else if (editDialog.item) {
      updateStaff(editDialog.item.id, formData);
      toast.success("Staff member updated successfully!");
    }

    setEditDialog({ open: false, item: null });
  };

  const handleToggleStatus = (staffMember) => {
    const newStatus = staffMember.status === "Active" ? "Inactive" : "Active";
    updateStaff(staffMember.id, { ...staffMember, status: newStatus });
    toast.success(
      `Staff member ${newStatus === "Active" ? "activated" : "inactivated"}`,
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage staff accounts and permissions
          </p>
        </div>
        <Button onClick={handleOpenAdd}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Staff
            </CardTitle>
            <Users className="w-5 h-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeCount} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Managers
            </CardTitle>
            <Shield className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{managerCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cashiers
            </CardTitle>
            <User className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cashierCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {staffRoles.map((role) => (
                <Button
                  key={role}
                  variant={selectedRole === role ? "default" : "outline"}
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
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No staff members found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStaff.map((staffMember) => (
                    <TableRow key={staffMember.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium">
                            {staffMember.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {staffMember.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            staffMember.role === "Manager"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {staffMember.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            staffMember.status === "Active"
                              ? "default"
                              : "outline"
                          }
                        >
                          {staffMember.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
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
                            className={
                              staffMember.status === "Active"
                                ? "text-destructive"
                                : ""
                            }
                          >
                            {staffMember.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
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
      <Dialog
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog({ open, item: viewDialog.item })}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Staff Member Details</DialogTitle>
          </DialogHeader>

          {viewDialog.item && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Name</div>
                  <div className="font-semibold">{viewDialog.item.name}</div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Email
                  </div>
                  <div className="font-semibold">{viewDialog.item.email}</div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">
                    Password
                  </div>
                  <div className="font-semibold font-mono">
                    {demoPasswords[viewDialog.item.email] || "Not available"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Demo password for testing purposes
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">
                      Role
                    </div>
                    <Badge
                      variant={
                        viewDialog.item.role === "Manager"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {viewDialog.item.role}
                    </Badge>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">
                      Status
                    </div>
                    <Badge
                      variant={
                        viewDialog.item.status === "Active"
                          ? "default"
                          : "outline"
                      }
                    >
                      {viewDialog.item.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setViewDialog({ open: false, item: null })}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Dialog */}
      <Dialog
        open={editDialog.open}
        onOpenChange={(open) => setEditDialog({ open, item: editDialog.item })}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editDialog.item === null
                ? "Add Staff Member"
                : "Edit Staff Member"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
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
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="e.g., juan@grainsmart.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="role">Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {staffRoles
                    .filter((role) => role !== "All")
                    .map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {formData.role === "Manager"
                  ? "Full access to all features and settings"
                  : "Can process transactions and manage stock"}
              </p>
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {staffStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialog({ open: false, item: null })}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editDialog.item === null
                ? "Add Staff Member"
                : "Update Staff Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

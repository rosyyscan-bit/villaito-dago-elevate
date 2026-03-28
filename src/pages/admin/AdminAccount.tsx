import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AdminAccount = () => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      // Verify current password by re-signing in
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error("No user found");

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      if (signInError) throw new Error("Current password is incorrect");

      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      toast({ title: "Success", description: "Password updated successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;
      toast({ title: "Success", description: "Check your new email for confirmation" });
      setNewEmail("");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-8">
      <div className="glass-card rounded-sm p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <Label className="text-foreground/80">Current Password</Label>
            <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="mt-1 bg-secondary/50" />
          </div>
          <div>
            <Label className="text-foreground/80">New Password</Label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1 bg-secondary/50" />
          </div>
          <div>
            <Label className="text-foreground/80">Confirm New Password</Label>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 bg-secondary/50" />
          </div>
          <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground">
            Update Password
          </Button>
        </form>
      </div>

      <div className="glass-card rounded-sm p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Update Email</h2>
        <form onSubmit={handleEmailChange} className="space-y-4">
          <div>
            <Label className="text-foreground/80">New Email</Label>
            <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required className="mt-1 bg-secondary/50" />
          </div>
          <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground">
            Update Email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminAccount;

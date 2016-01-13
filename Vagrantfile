Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty32"
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.provision "shell", path: "provision.sh"
  config.ssh.forward_agent = true

  config.vm.provider "virtualbox" do |vb|
  	vb.customize ["modifyvm", :id, "--nictype1", "Am79C973"]
  	vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
  end
end

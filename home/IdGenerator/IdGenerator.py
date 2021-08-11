import random

DIGITS = [0,1,2,3,4,5,6,7,8,9]
L_ALPHABETS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
U_ALPHABETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'p', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

class generateID:
	
	def __init__(self,uk):
		self.unique_key = str(uk)
		self.min_length = 14
		self.max_length = 20

	def appendRandomData(self,password,rd,rla,rua):
		_l = [rua,rla,rd] 
		for i in _l:
			password.append(i)

	def randomPickup(self,password,pl,unique_key):
		for i in range(0,pl,3):
			r_digit = str(random.choice(DIGITS))
			r_u_alphabets = random.choice(U_ALPHABETS)
			r_l_alphabets = random.choice(L_ALPHABETS)
			self.appendRandomData(password,r_digit,r_l_alphabets,r_u_alphabets)
		random.shuffle(password)
		password.insert(0,unique_key+"-")
		password_str = ''.join(password)
		return password_str

	def generate(self):
		password = []
		unique_key__len = len(str(self.unique_key))
		min_length = self.min_length
		max_length = self.max_length - unique_key__len
		password_length = random.randint(min_length,max_length)
		g_password = self.randomPickup(password,password_length,self.unique_key)
		return g_password

def generateId(unique_key):
	gid = generateID(uk=unique_key)
	return gid.generate()

#include <stdio.h>

int main() {
	const int lv = 1;
	int hp = 100;
	int attack = 8;
	int defence = 2;
	hp = 120;
	attack = 10;
	defence = 4;
	printf("%d,%d,%d,%d", lv, hp, attack, defence);

	return 0;
}

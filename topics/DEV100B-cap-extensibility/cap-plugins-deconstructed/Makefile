WORKDIR ?= /work
DIR ?= ${WORKDIR}/scratch/project/
STARTER ?= starter
USER ?= 1000
GROUP ?= 1000

.PHONY: starter setup

# Get everything ready for running thru the demo
ready:
	mkdir ${DIR} \
		&& tar -C ${DIR} -xzf ${STARTER}.tgz \
		&& cd ${DIR} \
		&& git init \
		&& chown -R ${USER}:${GROUP} . \
		&& git add . \
		&& git commit -m 'initial commit'

# Build the starter tarball ready for unpacking
starter:
	tar -C ${STARTER}/ -cvzf ${STARTER}.tgz .

# Wipe away any previous demo dir
clean:
	rm -rf ${DIR}
